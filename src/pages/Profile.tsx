
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react';

const Profile = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-500" />
        
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
              <img 
                src="https://i.pravatar.cc/150?img=3" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-6 md:mb-3">
              <h2 className="text-2xl font-bold">Alex Morgan</h2>
              <p className="text-text-secondary">Project Manager</p>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-auto">
              <button className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-600 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">About</h3>
                <p className="text-text-secondary">
                  Experienced project manager with a passion for delivering successful projects on time and within budget. 
                  Strong skills in team leadership, stakeholder management, and strategic planning.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail size={18} className="text-text-secondary mr-3" />
                    <span>alex.morgan@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={18} className="text-text-secondary mr-3" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={18} className="text-text-secondary mr-3" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Work Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Briefcase size={18} className="text-text-secondary mr-3" />
                  <div>
                    <p className="font-medium">Project Manager</p>
                    <p className="text-text-secondary text-sm">Yoliday Inc.</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="text-text-secondary mr-3" />
                  <div>
                    <p className="font-medium">Joined</p>
                    <p className="text-text-secondary text-sm">March 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
