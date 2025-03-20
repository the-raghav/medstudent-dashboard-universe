
import { useState } from 'react';
import { Bot, Brain, MessageCircle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface AIAssistantProps {
  defaultTab?: string;
}

const AIAssistant = ({ defaultTab = 'chat' }: AIAssistantProps) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Integrate with AI backend
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Medical Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultTab}>
          <TabsList className="w-full">
            <TabsTrigger value="chat" className="flex-1">
              <MessageCircle className="mr-2 h-4 w-4" />
              Medical Query
            </TabsTrigger>
            <TabsTrigger value="cases" className="flex-1">
              <BookOpen className="mr-2 h-4 w-4" />
              Case Studies
            </TabsTrigger>
            <TabsTrigger value="summarize" className="flex-1">
              <Brain className="mr-2 h-4 w-4" />
              Summarize Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Ask any medical concept..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px]"
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Processing..." : "Ask AI Assistant"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="cases" className="mt-4">
            <div className="text-center text-muted-foreground">
              Interactive case studies coming soon
            </div>
          </TabsContent>

          <TabsContent value="summarize" className="mt-4">
            <div className="text-center text-muted-foreground">
              Note summarization feature coming soon
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
