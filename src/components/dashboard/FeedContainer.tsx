
import { useState } from 'react';
import { MessageCircle, Heart, Share2, BookmarkPlus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface FeedPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

const defaultPosts: FeedPost[] = [
  {
    id: '1',
    author: {
      name: 'Dr. Emily Chen',
      avatar: '/placeholder.svg',
      role: 'Neurology Professor'
    },
    content: 'Just uploaded a new set of flashcards on neuroanatomy. Check out the Study Materials section to access them! #MedEd #Neurology',
    timestamp: '35 minutes ago',
    likes: 24,
    comments: 5
  },
  {
    id: '2',
    author: {
      name: 'James Wilson',
      avatar: '/placeholder.svg',
      role: '3rd Year Medical Student'
    },
    content: 'Looking for study partners for the upcoming cardiology exam. Anyone interested in forming a virtual study group? #StudyBuddy #Cardiology',
    timestamp: '2 hours ago',
    likes: 18,
    comments: 12
  },
  {
    id: '3',
    author: {
      name: 'Bloomin Medical',
      avatar: '/placeholder.svg',
      role: 'Official'
    },
    content: 'We\'re hosting a webinar on "Effective Study Techniques for Medical Students" this Friday at 5 PM EST. Register now in the Events section! #MedicalEducation',
    timestamp: '5 hours ago',
    likes: 42,
    comments: 8
  },
  {
    id: '4',
    author: {
      name: 'Dr. Sarah Johnson',
      avatar: '/placeholder.svg',
      role: 'Surgery Resident'
    },
    content: 'Just published my notes on surgical techniques for appendectomy. Find them in the Study Materials > Surgery section. Let me know if you have any questions! #Surgery #MedicalStudents',
    timestamp: '1 day ago',
    likes: 37,
    comments: 15
  }
];

const FeedContainer = () => {
  const [posts, setPosts] = useState<FeedPost[]>(defaultPosts);
  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked 
            } 
          : post
      )
    );
  };

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    
    const newPostObj: FeedPost = {
      id: Date.now().toString(),
      author: {
        name: 'Sarah Johnson',
        avatar: '/placeholder.svg',
        role: 'Medical Student'
      },
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      isLiked: false
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" alt="Your profile" />
                <AvatarFallback className="bg-bloomin-100 text-bloomin-700">SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea 
                  placeholder="Share something with the community..." 
                  className="resize-none border-none focus-visible:ring-0 p-0"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    className="bg-bloomin-500 hover:bg-bloomin-600"
                    onClick={handlePostSubmit}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback className="bg-bloomin-100 text-bloomin-700">
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800">{post.author.name}</span>
                    <span className="text-xs text-slate-500">@{post.author.name.replace(/\s+/g, '').toLowerCase()}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500">{post.timestamp}</span>
                  </div>
                  
                  <p className="text-sm text-slate-500 mt-1 font-light">{post.author.role}</p>
                  
                  <p className="mt-2 text-slate-800 whitespace-pre-wrap">{post.content}</p>
                  
                  <div className="flex justify-between mt-4">
                    <button 
                      className="flex items-center gap-1 text-slate-500 hover:text-bloomin-600 transition-colors"
                      aria-label="Comment"
                    >
                      <MessageCircle size={18} />
                      <span className="text-xs">{post.comments}</span>
                    </button>
                    
                    <button
                      className={`flex items-center gap-1 transition-colors ${post.isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
                      onClick={() => handleLike(post.id)}
                      aria-label="Like"
                    >
                      <Heart size={18} className={post.isLiked ? 'fill-current' : ''} />
                      <span className="text-xs">{post.likes}</span>
                    </button>
                    
                    <button
                      className="flex items-center gap-1 text-slate-500 hover:text-bloomin-600 transition-colors"
                      aria-label="Share"
                    >
                      <Share2 size={18} />
                    </button>
                    
                    <button
                      className="flex items-center gap-1 text-slate-500 hover:text-bloomin-600 transition-colors"
                      aria-label="Bookmark"
                    >
                      <BookmarkPlus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeedContainer;
