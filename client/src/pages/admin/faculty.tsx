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
import { insertFacultySchema, type Faculty, type InsertFaculty } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminFaculty() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const { toast } = useToast();

  const { data: faculty = [] } = useQuery<Faculty[]>({
    queryKey: ["/api/faculty"],
  });

  const form = useForm<InsertFaculty>({
    resolver: zodResolver(insertFacultySchema),
    defaultValues: {
      name: "",
      title: "",
      department: "",
      email: "",
      bio: "",
      imageUrl: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertFaculty) => {
      return await apiRequest("POST", "/api/faculty", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/faculty"] });
      toast({ title: "Faculty member added successfully!" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add faculty member",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertFaculty }) => {
      return await apiRequest("PATCH", `/api/faculty/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/faculty"] });
      toast({ title: "Faculty member updated successfully!" });
      setIsDialogOpen(false);
      setEditingFaculty(null);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update faculty member",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/faculty/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/faculty"] });
      toast({ title: "Faculty member deleted successfully!" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete faculty member",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertFaculty) => {
    if (editingFaculty) {
      updateMutation.mutate({ id: editingFaculty.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (member: Faculty) => {
    setEditingFaculty(member);
    form.reset({
      name: member.name,
      title: member.title,
      department: member.department,
      email: member.email,
      bio: member.bio,
      imageUrl: member.imageUrl || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this faculty member?")) {
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
                Faculty Management
              </h1>
              <p className="text-muted-foreground">
                Add, edit, or remove faculty members
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  onClick={() => {
                    setEditingFaculty(null);
                    form.reset({
                      name: "",
                      title: "",
                      department: "",
                      email: "",
                      bio: "",
                      imageUrl: "",
                    });
                  }}
                  data-testid="button-add-faculty"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Faculty
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingFaculty ? "Edit Faculty Member" : "Add Faculty Member"}
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the details below to{" "}
                    {editingFaculty ? "update the" : "add a new"} faculty member.
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
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-faculty-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g., Professor, Department Head"
                              data-testid="input-faculty-title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-faculty-department" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" data-testid="input-faculty-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={4} data-testid="textarea-faculty-bio" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-faculty-image" />
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
                        data-testid="button-save-faculty"
                      >
                        {createMutation.isPending || updateMutation.isPending
                          ? "Saving..."
                          : editingFaculty
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
            {faculty.map((member) => (
              <Card key={member.id} className="p-6" data-testid={`card-faculty-${member.id}`}>
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="h-20 w-20 mb-3">
                    <AvatarImage src={member.imageUrl || undefined} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-primary">{member.title}</p>
                  <p className="text-sm text-muted-foreground">{member.department}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEdit(member)}
                    data-testid={`button-edit-${member.id}`}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleDelete(member.id)}
                    data-testid={`button-delete-${member.id}`}
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
