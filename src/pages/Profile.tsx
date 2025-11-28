import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";

const profileSchema = z.object({
  fullName: z.string().max(100, "Name must be less than 100 characters").optional(),
  phoneNumber: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format").optional().or(z.literal("")),
  address: z.string().max(500, "Address must be less than 500 characters").optional(),
  occupation: z.string().max(100, "Occupation must be less than 100 characters").optional(),
  incomeRange: z.string().max(50, "Income range must be less than 50 characters").optional(),
  dateOfBirth: z.string().optional(),
  profilePicture: z.string().optional(),
});

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      dateOfBirth: "",
      address: "",
      occupation: "",
      incomeRange: "",
      profilePicture: "",
    },
  });

  const [investments, setInvestments] = useState({
    stocks: false,
    mutualFunds: false,
    crypto: false,
    realEstate: false,
    gold: false,
    others: false,
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/");
      return;
    }
    setUser(user);

    // Load profile data from database
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profile) {
      form.reset({
        fullName: profile.full_name || "",
        phoneNumber: profile.phone_number || "",
        dateOfBirth: profile.date_of_birth ? new Date(profile.date_of_birth).toISOString().split('T')[0] : "",
        address: profile.address || "",
        occupation: profile.occupation || "",
        incomeRange: profile.income_range || "",
        profilePicture: profile.profile_picture || "",
      });
      
      setEmail(user.email || "");
      
      if (profile.investments) {
        setInvestments(profile.investments as any);
      }
    } else if (profileError && profileError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is fine for new users
      console.error('Error loading profile:', profileError);
    } else {
      setEmail(user.email || "");
    }
  };

  const handleInvestmentChange = (key: string) => {
    setInvestments(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleSave = async (values: z.infer<typeof profileSchema>) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const profileData: any = {
        user_id: user.id,
        full_name: values.fullName || null,
        phone_number: values.phoneNumber || null,
        address: values.address || null,
        occupation: values.occupation || null,
        income_range: values.incomeRange || null,
        profile_picture: values.profilePicture || null,
        investments: investments,
      };

      // Only add date_of_birth if it has a value
      if (values.dateOfBirth) {
        profileData.date_of_birth = values.dateOfBirth;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Save error:', error);
        throw error;
      }
      
      toast.success("Profile updated successfully!");
      
      // Reload profile to confirm save
      await checkUser();
    } catch (error: any) {
      console.error('Profile save error:', error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-foreground">Your Profile</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your profile details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
                  {/* Profile Picture */}
                  <FormField
                    control={form.control}
                    name="profilePicture"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-6">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={field.value} />
                            <AvatarFallback className="text-2xl">
                              {user?.email ? getInitials(user.email) : "??"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <Label htmlFor="profilePicture" className="cursor-pointer">
                              <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                                <Upload className="h-4 w-4" />
                                <span>Upload Photo</span>
                              </div>
                            </Label>
                            <Input
                              id="profilePicture"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    field.onChange(reader.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        disabled
                        className="bg-muted"
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 XXXXX XXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Software Engineer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="incomeRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Income Range</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., ₹5L - ₹10L per annum" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Investment Interests */}
                  <div className="space-y-3">
                    <Label className="text-base">Investment Interests</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(investments).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            id={key}
                            checked={value}
                            onCheckedChange={() => handleInvestmentChange(key)}
                          />
                          <Label
                            htmlFor={key}
                            className="text-sm font-normal cursor-pointer capitalize"
                          >
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                    >
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;