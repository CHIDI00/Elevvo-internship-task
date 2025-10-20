import { toast } from "sonner";
import { User, Mail, Lock, Save } from "lucide-react";

const Profile = () => {
  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Profile settings saved successfully");
  };

  return (
    <div className="space-y-8 animate-fade-in lg:w-2/3 w-full">
      <div>
        <h1 className="text-3xl font-bold mb-2 dark:text-white">
          Profile Settings
        </h1>
        <p className="dark:text-gray-300">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-b from-white via-white to-purple-50 dark:bg-gradient-to-b dark:from-[#0b111f] dark:to-[#0e1628] border border-gray-200 dark:border-[#252525] rounded-lg p-8">
        <div className="mb-6 font-medium text-2xl dark:text-white">
          <p>Personal Information</p>
        </div>
        <div>
          <div className="flex items-center gap-6 mb-8">
            <div className="h-20 w-20 rounded-full bg-purple-700 flex justify-center items-center">
              <p className="text-2xl text-white font-medium">MDL</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold dark:text-white">
                Monkey D. Luffy
              </h3>
              <p className="text-sm dark:text-white">
                Freelance Designer & Developer
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 dark:text-white"
                >
                  <User className="h-4 w-4" />
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  defaultValue="Monkey D. Luffy"
                  className="transition-smooth duration-300 bg-white dark:bg-[#0b071a] dark:text-white px-4 py-2 border border-gray-200 rounded-lg w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 dark:text-white"
                >
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  defaultValue="luffy@gmail.com"
                  className="transition-smooth duration-300 bg-white dark:bg-[#0b071a] dark:text-white px-4 py-2 border border-gray-200 rounded-lg w-full"
                />
              </div>
            </div>

            <div className="space-y-2 col-span-2">
              <label
                htmlFor="password"
                className="flex items-center gap-2 dark:text-white"
              >
                <Lock className="h-4 w-4" />
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="transition-smooth duration-300 bg-white dark:bg-[#0b071a] dark:text-white px-4 py-2 border border-gray-200 rounded-lg w-full"
              />
              <p className="text-xs dark:text-white">
                Leave blank to keep your current password
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-gradient-to-b from-purple-700 via-purple-600 to-purple-500 flex gap-1 items-center text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-b from-white via-white to-purple-50 dark:bg-gradient-to-b dark:from-[#0b111f] dark:to-[#0e1628] border border-gray-200 dark:border-[#252525] rounded-lg p-8">
        <div className="dark:text-white">
          <p>Account Statistics</p>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-[#0a0e19] dark:text-white">
              <p className="text-3xl font-bold text-primary mb-2">42</p>
              <p className="text-sm text-muted-foreground">
                Projects Completed
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-[#0a0e19] dark:text-white">
              <p className="text-3xl font-bold text-primary mb-2">18</p>
              <p className="text-sm text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-[#0a0e19] dark:text-white">
              <p className="text-3xl font-bold text-primary mb-2">3.2k</p>
              <p className="text-sm text-muted-foreground">Hours Worked</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
