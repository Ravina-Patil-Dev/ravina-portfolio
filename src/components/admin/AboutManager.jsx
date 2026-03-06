import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Calendar, Mail, Phone, MapPin, Upload, Camera, X, Link as LinkIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '../../lib/supabase.js';
import { Profile, AboutMe } from '../../types/index.js';
import toast from 'react-hot-toast';

const AboutManager = () => {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    date_of_birth: '',
    profile_image: '',
    resume_url: '',
  });
  const [aboutMe, setAboutMe] = useState({
    bio: '',
    skills: [],
    stats: {
      projects_completed: '50+',
      years_experience: '3+',
      happy_clients: '100+',
      support_available: '24/7'
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadMethod, setUploadMethod] = useState('file');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (!supabase) {
        setLoading(false);
        return;
      }

      // Fetch profile data
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setProfile(data);
      }

      // Fetch about me data
      let aboutData = null;
      try {
        const { data, error: aboutError } = await supabase
          .from('about_me')
          .select('*')
          .limit(1)
          .maybeSingle();
        
        if (aboutError && aboutError.code !== 'PGRST116' && aboutError.code !== 'PGRST205') {
          throw aboutError;
        }
        aboutData = data;
      } catch (error) {
        if (error.code === 'PGRST205') {
          console.warn('about_me table not found, will create new record on save');
        } else {
          throw error;
        }
      }
      
      if (aboutData) {
        setAboutMe(aboutData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.code === 'PGRST205') {
        console.warn('Database table not found, using default values');
      } else {
        toast.error('Error fetching data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (!supabase) {
        toast.error('Database not configured');
        return;
      }

      const profileData = {
        ...profile,
        profile_image: previewImage || profile.profile_image,
        updated_at: new Date().toISOString(),
      };

      const aboutMeData = {
        ...aboutMe,
        skills: Array.isArray(aboutMe.skills) ? aboutMe.skills : 
                typeof aboutMe.skills === 'string' ? aboutMe.skills.split(',').map(s => s.trim()).filter(s => s) : [],
        updated_at: new Date().toISOString(),
      };

      // Save profile data
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (existingProfile) {
        const { error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', existingProfile.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('profiles')
          .insert([{ ...profileData, created_at: new Date().toISOString() }]);
        
        if (error) throw error;
      }

      // Save about me data
      const { data: existingAboutMe } = await supabase
        .from('about_me')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (existingAboutMe) {
        const { error } = await supabase
          .from('about_me')
          .update(aboutMeData)
          .eq('id', existingAboutMe.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('about_me')
          .insert([{ ...aboutMeData, created_at: new Date().toISOString() }]);
        
        if (error) throw error;
      }

      toast.success('About Me section updated successfully');
      await fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Error saving data');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (files) => {
    if (files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setUploadingImage(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        setPreviewImage(result);
        toast.success('Image uploaded successfully');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleImageUpload,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  if (loading) {
    return <div className="text-white text-center py-8">Loading about me information...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <User className="text-blue-400" size={24} />
        <h2 className="text-2xl font-bold text-white">About Me Section</h2>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Image Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex flex-col items-center"
        >
          <label className="block text-sm font-medium text-white mb-4">Profile Image</label>
          
          {/* Upload Method Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setUploadMethod('file')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                uploadMethod === 'file'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Upload size={16} className="inline mr-2" />
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setUploadMethod('url')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                uploadMethod === 'url'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <LinkIcon size={16} className="inline mr-2" />
              Image URL
            </button>
          </div>
          
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 bg-white/10">
              {(previewImage || profile.profile_image) ? (
                <img
                  src={previewImage || profile.profile_image || ''}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User size={48} className="text-white/50" />
                </div>
              )}
            </div>
            
            {(previewImage || profile.profile_image) && (
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null);
                  setProfile({ ...profile, profile_image: '' });
                }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {uploadMethod === 'file' ? (
            <div
              {...getRootProps()}
              className={`w-full max-w-md p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                isDragActive
                  ? 'border-blue-400 bg-blue-500/10'
                  : 'border-white/30 hover:border-white/50 bg-white/5 hover:bg-white/10'
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-center">
                {uploadingImage ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-white">Uploading...</span>
                  </div>
                ) : (
                  <>
                    <Camera className="w-8 h-8 text-white/60 mx-auto mb-2" />
                    <p className="text-white/80 mb-1">
                      {isDragActive ? 'Drop image here' : 'Click or drag image here'}
                    </p>
                    <p className="text-white/50 text-sm">PNG, JPG, GIF up to 5MB</p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <input
                type="url"
                value={profile.profile_image || ''}
                onChange={(e) => {
                  setProfile({ ...profile, profile_image: e.target.value });
                  setPreviewImage(null);
                }}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-white mb-2">Full Name</label>
            <input
              type="text"
              value={profile.name || ''}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Your full name"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-white mb-2">Professional Title</label>
            <input
              type="text"
              value={profile.title || ''}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="e.g., Web Dev II Traveller II Positive Impact"
              required
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-white mb-2">About Me Bio</label>
          <textarea
            value={aboutMe.bio || ''}
            onChange={(e) => setAboutMe({ ...aboutMe, bio: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            placeholder="Tell visitors about yourself, your passion, background, and what drives you..."
            required
          />
          <p className="text-white/50 text-sm mt-2">
            This will be displayed in the About Me section of your portfolio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <label className="block text-sm font-medium text-white mb-2">Skills (comma separated)</label>
          <input
            type="text"
            value={Array.isArray(aboutMe.skills) ? aboutMe.skills.join(', ') : aboutMe.skills || ''}
            onChange={(e) => setAboutMe({ ...aboutMe, skills: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Full-Stack Development, Web Technologies, Problem Solving, UI/UX Design"
          />
          <p className="text-white/50 text-sm mt-2">
            These skills will be displayed as cards in the About Me section.
          </p>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Projects Completed</label>
              <input
                type="text"
                value={aboutMe.stats?.projects_completed || ''}
                onChange={(e) => setAboutMe({ 
                  ...aboutMe, 
                  stats: { ...aboutMe.stats, projects_completed: e.target.value }
                })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="50+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Years Experience</label>
              <input
                type="text"
                value={aboutMe.stats?.years_experience || ''}
                onChange={(e) => setAboutMe({ 
                  ...aboutMe, 
                  stats: { ...aboutMe.stats, years_experience: e.target.value }
                })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="3+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Happy Clients</label>
              <input
                type="text"
                value={aboutMe.stats?.happy_clients || ''}
                onChange={(e) => setAboutMe({ 
                  ...aboutMe, 
                  stats: { ...aboutMe.stats, happy_clients: e.target.value }
                })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="100+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Support Available</label>
              <input
                type="text"
                value={aboutMe.stats?.support_available || ''}
                onChange={(e) => setAboutMe({ 
                  ...aboutMe, 
                  stats: { ...aboutMe.stats, support_available: e.target.value }
                })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="24/7"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-white mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
              <input
                type="email"
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-white mb-2">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
              <input
                type="tel"
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-white mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
              <input
                type="text"
                value={profile.location || ''}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="City, Country"
                required
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label className="block text-sm font-medium text-white mb-2">Date of Birth</label>
          <div className="relative max-w-md">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
            <input
              type="date"
              value={profile.date_of_birth || ''}
              onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <p className="text-white/50 text-sm mt-2">
            This will be displayed in your About Me section instead of location.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <label className="block text-sm font-medium text-white mb-2">Resume URL</label>
          <input
            type="url"
            value={profile.resume_url || ''}
            onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="https://example.com/resume.pdf"
          />
        </motion.div>

        <motion.div
          className="flex justify-end pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save About Me
              </>
            )}
          </button>
        </motion.div>
      </form>

      {/* Preview Section */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
        <div className="space-y-4">
          {profile.name && (
            <div>
              <h4 className="text-white font-medium mb-2">Name:</h4>
              <p className="text-white/80">{profile.name}</p>
            </div>
          )}
          {profile.title && (
            <div>
              <h4 className="text-white font-medium mb-2">Title:</h4>
              <p className="text-white/80">{profile.title}</p>
            </div>
          )}
          {aboutMe.bio && (
            <div>
              <h4 className="text-white font-medium mb-2">Bio:</h4>
              <p className="text-white/80 leading-relaxed">{aboutMe.bio}</p>
            </div>
          )}
          {aboutMe.skills && aboutMe.skills.length > 0 && (
            <div>
              <h4 className="text-white font-medium mb-2">Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(aboutMe.skills) ? aboutMe.skills : aboutMe.skills.split(',')).map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">
                    {typeof skill === 'string' ? skill.trim() : skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {profile.email && (
            <div>
              <h4 className="text-white font-medium mb-2">Email:</h4>
              <p className="text-white/80">{profile.email}</p>
            </div>
          )}
          {profile.phone && (
            <div>
              <h4 className="text-white font-medium mb-2">Phone:</h4>
              <p className="text-white/80">{profile.phone}</p>
            </div>
          )}
          {profile.location && (
            <div>
              <h4 className="text-white font-medium mb-2">Location:</h4>
              <p className="text-white/80">{profile.location}</p>
            </div>
          )}
          {profile.date_of_birth && (
            <div>
              <h4 className="text-white font-medium mb-2">Date of Birth:</h4>
              <p className="text-white/80">
                Born: {new Date(profile.date_of_birth).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          )}
          {aboutMe.stats && (
            <div>
              <h4 className="text-white font-medium mb-2">Statistics:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Projects: {aboutMe.stats.projects_completed}</div>
                <div>Experience: {aboutMe.stats.years_experience}</div>
                <div>Clients: {aboutMe.stats.happy_clients}</div>
                <div>Support: {aboutMe.stats.support_available}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutManager;