import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProgramSchema, type Program, type InsertProgram } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Users } from "lucide-react";

export default function AdminPrograms() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const { toast } = useToast();

  const { data: programs = [] } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });

  const form = useForm<InsertProgram>({
    resolver: zodResolver(insertProgramSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "",
      facultyCount: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertProgram) => {
      return await apiRequest("POST", "/api/programs", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/programs"] });
      toast({ title: "Program added successfully!" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add program",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertProgram }) => {
      return await apiRequest("PATCH", `/api/programs/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/programs"] });
      toast({ title: "Program updated successfully!" });
      setIsDialogOpen(false);
      setEditingProgram(null);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update program",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/programs/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/programs"] });
      toast({ title: "Program deleted successfully!" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete program",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertProgram) => {
    if (editingProgram) {
      updateMutation.mutate({ id: editingProgram.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    form.reset({
      name: program.name,
      description: program.description,
      icon: program.icon,
      facultyCount: program.facultyCount,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this program?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                Programs Management
              </h1>
              <p className="text-muted-foreground">
                Update academic programs and departments
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  onClick={() => {
                    setEditingProgram(null);
                    form.reset({
                      name: "",
                      description: "",
                      icon: "",
                      facultyCount: 0,
                    });
                  }}
                  data-testid="button-add-program"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Program
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingProgram ? "Edit Program" : "Add Program"}
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the details below to{" "}
                    {editingProgram ? "update the" : "add a new"} program.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Program Name</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-program-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} data-testid="textarea-program-description" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icon (Emoji)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., 🔬, 📚, 🎨" data-testid="input-program-icon" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="facultyCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Faculty Count</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                              data-testid="input-program-faculty-count"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={createMutation.isPending || updateMutation.isPending}
                        data-testid="button-save-program"
                      >
                        {createMutation.isPending || updateMutation.isPending
                          ? "Saving..."
                          : editingProgram
                          ? "Update"
                          : "Add"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Card key={program.id} className="p-6" data-testid={`card-program-${program.id}`}>
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-6 mb-4 flex items-center justify-center">
                  <div className="text-6xl">{program.icon}</div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{program.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {program.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Users className="h-4 w-4" />
                  <span>{program.facultyCount} faculty members</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(program)}
                    data-testid={`button-edit-${program.id}`}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDelete(program.id)}
                    data-testid={`button-delete-${program.id}`}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
