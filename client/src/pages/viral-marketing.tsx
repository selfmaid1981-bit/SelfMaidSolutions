import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Copy, Instagram, Facebook, Sparkles, TrendingUp, Clock, Hash, MessageCircle, Heart, Share2, Zap, Target, Users, Calendar, Video, Image, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const viralHooks = [
  { hook: "POV: Your house goes from chaos to calm in 3 hours ✨", type: "POV", platform: "both" },
  { hook: "Nobody talks about how satisfying THIS is...", type: "Curiosity", platform: "both" },
  { hook: "Wait for the before and after 🤯", type: "Transformation", platform: "instagram" },
  { hook: "3 cleaning mistakes that are costing you HOURS", type: "Educational", platform: "both" },
  { hook: "Things professional cleaners NEVER do (but you probably do)", type: "Insider", platform: "both" },
  { hook: "We cleaned this house after 6 months of no cleaning...", type: "Story", platform: "both" },
  { hook: "Rate this transformation 1-10 👇", type: "Engagement", platform: "instagram" },
  { hook: "This $3 product changed everything about how I clean", type: "Product", platform: "both" },
  { hook: "Unpopular opinion: You're cleaning your bathroom WRONG", type: "Controversy", platform: "facebook" },
  { hook: "Tag someone who needs this in their life 😅", type: "Tag", platform: "facebook" },
  { hook: "The #1 thing guests ACTUALLY notice in your home", type: "Fear", platform: "both" },
  { hook: "Cleaning therapist here 🧹 Let me save your sanity", type: "Authority", platform: "instagram" },
];

const instagramCaptions = [
  {
    title: "Before/After Transformation",
    caption: `✨ From cluttered to crystal clear in just 2 hours!

This Montgomery home hadn't had a deep clean in months. Swipe to see the magic ➡️

Our team transformed:
🧹 Kitchen (including inside appliances)
🛁 Both bathrooms 
🧽 All floors & baseboards
💨 Dusted every surface

The homeowner literally cried happy tears. This is why we do what we do. 🥹

📍 Serving Montgomery, Prattville, Selma & surrounding areas
📞 (334) 877-9513
🌐 selfmaidllc.com

#MontgomeryCleaning #PrattvilleCleaner #DeepCleaning #BeforeAndAfter #CleaningTransformation #SatisfyingClean #AlabamaCleaningService #HomeCleaning #CleanHome #SelfMaid`,
    type: "Carousel/Reel"
  },
  {
    title: "Cleaning Tips Reel",
    caption: `Stop wasting 3 hours cleaning your bathroom when you could do it in 30 minutes 🚿

Here's my pro method (save this!):

1️⃣ Spray everything FIRST - let products do the work
2️⃣ Top to bottom, always
3️⃣ Don't forget the toilet brush holder (you'd be shocked 🫣)
4️⃣ Glass last, streak-free every time

Want YOUR bathroom to sparkle? We've got you. Link in bio for $20 off your first clean! 🧼

#CleaningHacks #BathroomCleaning #ProCleaningTips #CleanWithMe #HomeHacks #CleaningMotivation #SatisfyingClean #MontgomeryAL`,
    type: "Reel"
  },
  {
    title: "Client Testimonial",
    caption: `"I walked in and started crying. I forgot my house could look like this." - Sarah, Montgomery 🥺

This is the message that keeps us going. Every. Single. Day.

After having twins, Sarah hadn't had a proper clean in 8 months. No judgment here - just support. 💙

We deep cleaned her entire 3BR home while she took the babies to the park. She came home to a fresh start.

Mama, if you need permission to ask for help - THIS IS IT. 

$20 OFF your first clean → Link in bio
📞 (334) 877-9513

#MomLife #NewMom #SelfCare #MontgomeryMoms #CleaningService #MomSupport #AskForHelp #SelfMaid`,
    type: "Story/Post"
  },
  {
    title: "Engagement Post",
    caption: `Real talk: What's the ONE room you avoid cleaning? 👀

Drop it in the comments 👇

A) Kitchen (those dishes never end 😩)
B) Bathroom (self-explanatory 🚽)
C) Kids' rooms (legos everywhere 💀)
D) All of the above (no shame!)

We'll tell you ours: It's definitely the oven. That's why we let the pros handle it 😅

Speaking of pros... $20 OFF your first deep clean! Link in bio 🧹

#CleaningCommunity #RealTalk #CleaningService #MontgomeryAL #Relatable #HomeOwnerLife`,
    type: "Engagement Post"
  },
  {
    title: "Trending Audio Reel",
    caption: `When they said "just do a quick clean before guests arrive" 🏃‍♀️✨

[Use trending audio: "I can do it with a broken heart"]

Tag someone who stress-cleans before company comes over 😂

Pro tip: Skip the stress. Book us 48 hours before your next event. We'll handle it. 

Link in bio | (334) 877-9513

#CleaningReels #Relatable #GuestsAreComing #MontgomeryLife #StressClean #CleaningMotivation`,
    type: "Trending Reel"
  }
];

const facebookPosts = [
  {
    title: "Before/After Album",
    post: `🏠 TRANSFORMATION TUESDAY 🏠

This Prattville family called us after their kids' birthday party... Let's just say there was a LOT of cake involved 🎂😅

✅ Deep cleaned kitchen (including inside the fridge - yes, there was frosting)
✅ Scrubbed all floors
✅ Sanitized both bathrooms
✅ Spot-cleaned carpets

Total time: 3 hours
Result: One very happy mama

📸 Swipe through to see the before/after photos!

🎁 NEW CUSTOMERS: Get $20 OFF your first cleaning!
📞 Call/Text: (334) 877-9513
🌐 Book online: selfmaidllc.com

We serve Montgomery, Prattville, Selma, Homewood, Clanton & all surrounding areas!

Who else needs this after hosting? Drop a 🙋‍♀️ below!`,
    type: "Photo Album"
  },
  {
    title: "Poll Post",
    post: `🤔 Quick poll for my Alabama friends:

How often do you DEEP CLEAN your home?

🔵 Weekly (teach me your ways!)
🟢 Monthly (pretty good!)
🟡 Every few months (no judgment!)
🔴 When company is coming (most honest answer 😂)

Comment your answer below! 👇

Fun fact: Most families benefit from a professional deep clean every 3-4 months, with regular maintenance in between.

Need help getting caught up? We've got $20 OFF for new customers!
📞 (334) 877-9513 | selfmaidllc.com`,
    type: "Poll/Engagement"
  },
  {
    title: "Local Business Post",
    post: `🏡 ATTENTION MONTGOMERY & PRATTVILLE HOMEOWNERS 🏡

Spring cleaning season is HERE and our calendar is filling up FAST!

Here's what we're seeing a lot of requests for:
✨ Move-in/Move-out deep cleans
✨ Post-construction cleaning
✨ Airbnb turnover service
✨ Regular weekly/bi-weekly maintenance

We're a LOCAL, family-owned business that's been serving Central Alabama for over 16 years. All our cleaners are background-checked, insured, and trained to our standards.

🎁 SPRING SPECIAL: $20 OFF your first service!

📅 Book now before we fill up:
📞 (334) 877-9513
🌐 selfmaidllc.com
📧 selfmaidclean@outlook.com

Share this with a friend who's been putting off that deep clean! 💙`,
    type: "Promotional"
  },
  {
    title: "Story/Testimonial",
    post: `💬 CLIENT STORY TIME 💬

Last week, we got a call from Jennifer in Selma. She'd just had surgery and couldn't keep up with housework. Her exact words: "I'm embarrassed to even ask for help."

Mama. There is NO shame in asking for help. Ever.

We came in, deep cleaned her entire home, did her laundry, and even organized her kitchen. When she saw it, she cried.

"You didn't just clean my house. You gave me peace of mind during the hardest time of my life."

THIS is why we do what we do. 💙

If you or someone you know is going through a hard time - whether it's surgery recovery, new baby, loss, or just LIFE - we're here.

No judgment. Just clean.

📞 (334) 877-9513
🌐 selfmaidllc.com

Tag someone who might need to hear this. 💙`,
    type: "Emotional Story"
  },
  {
    title: "Giveaway Post",
    post: `🎉 GIVEAWAY TIME 🎉

We're giving away a FREE DEEP CLEANING (up to $350 value) to one lucky winner!

TO ENTER:
1️⃣ LIKE this post
2️⃣ FOLLOW our page
3️⃣ TAG 2 friends who need this!
4️⃣ SHARE to your story for BONUS entry

Winner announced Friday at 5pm!

Open to Montgomery, Prattville, Selma, Homewood, Clanton & surrounding areas.

Good luck! 🍀🧹

#Giveaway #FreeClean #MontgomeryGiveaway #LocalBusiness #SelfMaid`,
    type: "Giveaway"
  }
];

const hashtagSets = {
  instagram: {
    local: ["#MontgomeryCleaning", "#PrattvilleCleaners", "#SelmaCleaning", "#AlabamaCleaningService", "#MontgomeryAL", "#CentralAlabama", "#HomewoodAL", "#ClantonAL"],
    niche: ["#DeepCleaning", "#HouseCleaning", "#MoveOutCleaning", "#AirbnbCleaning", "#OfficeCleaning", "#ResidentialCleaning"],
    trending: ["#CleanWithMe", "#SatisfyingClean", "#CleaningMotivation", "#CleaningTransformation", "#BeforeAndAfter", "#ASMR"],
    community: ["#SmallBusiness", "#LocalBusiness", "#WomenOwned", "#FamilyBusiness", "#SupportLocal"]
  },
  facebook: {
    local: ["#MontgomeryAlabama", "#PrattvilleAlabama", "#SelmaAlabama", "#CentralAlabama", "#RiverRegion"],
    business: ["#LocalBusiness", "#SmallBusiness", "#SupportLocal", "#FamilyOwned"],
    service: ["#CleaningService", "#HouseCleaning", "#DeepCleaning", "#ProfessionalCleaning"]
  }
};

const contentCalendar = [
  { day: "Monday", content: "Motivation Monday - Cleaning tips or hacks", format: "Reel/Video", platform: "Both" },
  { day: "Tuesday", content: "Transformation Tuesday - Before/After", format: "Carousel/Album", platform: "Both" },
  { day: "Wednesday", content: "Behind the Scenes - Team at work", format: "Story/Reel", platform: "Instagram" },
  { day: "Thursday", content: "Throwback/Testimonial Thursday", format: "Post", platform: "Both" },
  { day: "Friday", content: "Fun Friday - Relatable content", format: "Reel", platform: "Instagram" },
  { day: "Saturday", content: "Weekend Special Offer", format: "Story", platform: "Both" },
  { day: "Sunday", content: "Self-care Sunday - Why clean homes matter", format: "Post", platform: "Facebook" }
];

const viralFormulas = [
  { name: "Hook → Problem → Solution → CTA", example: "Stop scrubbing grout for hours → Hard water stains are stubborn → Use this paste (recipe) → Save this for later!" },
  { name: "POV Transformation", example: "POV: You hired a cleaning service for the first time [show before] → [dramatic reveal after]" },
  { name: "This vs That", example: "How I used to clean the shower vs How I clean now (pro method)" },
  { name: "Storytime + Lesson", example: "We cleaned a hoarder house (with permission) - here's what we learned about compassion" },
  { name: "Trend Jack + Niche", example: "Use trending audio + cleaning content = algorithm boost" }
];

export default function ViralMarketing() {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <>
      <SEOHead
        title="Viral Marketing Toolkit | Self-Maid Cleaning Solutions"
        description="Instagram and Facebook viral marketing strategies, content templates, and social media toolkit for cleaning business growth."
        noindex={true}
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <section className="py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                <span className="bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-700 bg-clip-text text-transparent">Viral</span> Marketing{' '}
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Toolkit</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Proven <span className="text-pink-600 font-semibold">Instagram</span> & <span className="text-emerald-700 font-semibold">Facebook</span> content strategies to grow your cleaning business
              </p>
              <div className="flex justify-center gap-3 mt-6">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Instagram className="w-3 h-3" /> Instagram
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Facebook className="w-3 h-3" /> Facebook
                </Badge>
              </div>
            </div>

            <Tabs defaultValue="hooks" className="space-y-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto p-2">
                <TabsTrigger value="hooks" className="flex items-center gap-2" data-testid="tab-hooks">
                  <Zap className="w-4 h-4" /> Viral Hooks
                </TabsTrigger>
                <TabsTrigger value="instagram" className="flex items-center gap-2" data-testid="tab-instagram">
                  <Instagram className="w-4 h-4" /> Instagram
                </TabsTrigger>
                <TabsTrigger value="facebook" className="flex items-center gap-2" data-testid="tab-facebook">
                  <Facebook className="w-4 h-4" /> Facebook
                </TabsTrigger>
                <TabsTrigger value="hashtags" className="flex items-center gap-2" data-testid="tab-hashtags">
                  <Hash className="w-4 h-4" /> Hashtags
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-2" data-testid="tab-calendar">
                  <Calendar className="w-4 h-4" /> Calendar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hooks" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      Scroll-Stopping Hooks
                    </CardTitle>
                    <CardDescription>
                      The first 1-3 seconds determine if someone watches your content. Use these proven hooks.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {viralHooks.map((item, i) => (
                        <div 
                          key={i} 
                          className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                          data-testid={`hook-${i}`}
                        >
                          <div className="flex-1">
                            <p className="font-medium">{item.hook}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">{item.type}</Badge>
                              <Badge variant="secondary" className="text-xs">
                                {item.platform === "both" ? "IG + FB" : item.platform === "instagram" ? "Instagram" : "Facebook"}
                              </Badge>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyToClipboard(item.hook, "Hook")}
                            data-testid={`copy-hook-${i}`}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Viral Content Formulas</CardTitle>
                    <CardDescription>Repeatable structures that consistently perform well</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {viralFormulas.map((formula, i) => (
                        <div key={i} className="p-4 border rounded-lg">
                          <h4 className="font-bold text-primary mb-2">{formula.name}</h4>
                          <p className="text-sm text-muted-foreground">{formula.example}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instagram" className="space-y-6">
                <div className="grid gap-6">
                  {instagramCaptions.map((post, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Instagram className="w-5 h-5 text-pink-500" />
                            {post.title}
                          </CardTitle>
                          <Badge>{post.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted/50 p-4 rounded-lg whitespace-pre-wrap text-sm font-mono">
                          {post.caption}
                        </div>
                        <Button 
                          className="mt-4" 
                          onClick={() => copyToClipboard(post.caption, "Caption")}
                          data-testid={`copy-ig-${i}`}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Caption
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="facebook" className="space-y-6">
                <div className="grid gap-6">
                  {facebookPosts.map((post, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Facebook className="w-5 h-5 text-emerald-600" />
                            {post.title}
                          </CardTitle>
                          <Badge variant="secondary">{post.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted/50 p-4 rounded-lg whitespace-pre-wrap text-sm">
                          {post.post}
                        </div>
                        <Button 
                          className="mt-4" 
                          onClick={() => copyToClipboard(post.post, "Post")}
                          data-testid={`copy-fb-${i}`}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Post
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hashtags" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Instagram className="w-5 h-5 text-pink-500" />
                        Instagram Hashtags
                      </CardTitle>
                      <CardDescription>Use 10-15 hashtags per post (mix of types)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(hashtagSets.instagram).map(([category, tags]) => (
                        <div key={category}>
                          <h4 className="font-semibold capitalize mb-2">{category} Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {tags.map(tag => (
                              <Badge 
                                key={tag} 
                                variant="outline" 
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                onClick={() => copyToClipboard(tag, tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Button 
                        className="w-full mt-4"
                        onClick={() => copyToClipboard(Object.values(hashtagSets.instagram).flat().join(" "), "All Instagram hashtags")}
                        data-testid="copy-all-ig-hashtags"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy All Instagram Hashtags
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Facebook className="w-5 h-5 text-emerald-600" />
                        Facebook Hashtags
                      </CardTitle>
                      <CardDescription>Use 3-5 hashtags per post (less is more)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(hashtagSets.facebook).map(([category, tags]) => (
                        <div key={category}>
                          <h4 className="font-semibold capitalize mb-2">{category} Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {tags.map(tag => (
                              <Badge 
                                key={tag} 
                                variant="outline" 
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                onClick={() => copyToClipboard(tag, tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Button 
                        className="w-full mt-4"
                        onClick={() => copyToClipboard(Object.values(hashtagSets.facebook).flat().join(" "), "All Facebook hashtags")}
                        data-testid="copy-all-fb-hashtags"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy All Facebook Hashtags
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="calendar" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Weekly Content Calendar
                    </CardTitle>
                    <CardDescription>
                      Consistency beats perfection. Aim for 4-5 posts per week minimum.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full" data-testid="content-calendar">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-semibold">Day</th>
                            <th className="text-left p-3 font-semibold">Content Theme</th>
                            <th className="text-left p-3 font-semibold">Format</th>
                            <th className="text-left p-3 font-semibold">Platform</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contentCalendar.map((day, i) => (
                            <tr key={i} className="border-b hover:bg-muted/50">
                              <td className="p-3 font-medium">{day.day}</td>
                              <td className="p-3">{day.content}</td>
                              <td className="p-3">
                                <Badge variant="outline">{day.format}</Badge>
                              </td>
                              <td className="p-3">
                                <Badge variant="secondary">{day.platform}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Clock className="w-5 h-5 text-emerald-500" />
                        Best Posting Times
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Instagram</span>
                        <span className="text-muted-foreground">11am-1pm, 7-9pm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Facebook</span>
                        <span className="text-muted-foreground">9am-12pm, 3-4pm</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        *Based on Alabama timezone (CST). Check your analytics for your specific audience.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Target className="w-5 h-5 text-emerald-500" />
                        Engagement Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Like Rate</span>
                        <span className="text-muted-foreground">5%+ of reach</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Comment Rate</span>
                        <span className="text-muted-foreground">1%+ of reach</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Save Rate</span>
                        <span className="text-muted-foreground">2%+ (Explore boost)</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Users className="w-5 h-5 text-green-500" />
                        Growth Tactics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p>✅ Reply to comments within 1 hour</p>
                      <p>✅ Use Stories daily (15+ per week)</p>
                      <p>✅ Go Live 1-2x per week</p>
                      <p>✅ Collab with local businesses</p>
                      <p>✅ Run monthly giveaways</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            <Card className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">🔥 Quick Viral Checklist</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Before Posting:</h4>
                    <ul className="space-y-2 text-white/90">
                      <li>☐ Hook in first 1-3 seconds</li>
                      <li>☐ High-quality visuals (good lighting)</li>
                      <li>☐ Trending audio (Instagram Reels)</li>
                      <li>☐ Clear CTA (save, share, comment)</li>
                      <li>☐ Optimized hashtags</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">After Posting (First 30 min):</h4>
                    <ul className="space-y-2 text-white/90">
                      <li>☐ Share to Stories</li>
                      <li>☐ Reply to ALL comments</li>
                      <li>☐ Engage with 10-20 accounts</li>
                      <li>☐ Send to close friends/family</li>
                      <li>☐ Cross-post to other platforms</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8 border-2 border-emerald-500" data-testid="buffer-setup-guide">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-emerald-500" />
                  Automate Posting with Buffer (Free)
                </CardTitle>
                <CardDescription>
                  Schedule posts to LinkedIn, Facebook, and Instagram automatically
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-3">Setup Steps (5 minutes)</h4>
                    <ol className="space-y-3 text-sm">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <span>Go to <a href="https://buffer.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline font-semibold">buffer.com</a> and sign up for free</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <span>Click "Connect Channel" and add your accounts:
                          <ul className="mt-1 ml-4 space-y-1 text-muted-foreground">
                            <li>• LinkedIn (personal + company page)</li>
                            <li>• Facebook Page</li>
                            <li>• Instagram Business account</li>
                          </ul>
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <span>Copy content from the tabs above using the copy buttons</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                        <span>Paste into Buffer's composer and schedule your posts</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-bold mb-3">Buffer Free Plan Includes:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span> Connect 3 social channels
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span> Schedule up to 10 posts per channel
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span> AI Assistant for caption ideas
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span> Landing page builder
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span> Basic analytics
                      </li>
                    </ul>
                    
                    <div className="mt-4 pt-4 border-t">
                      <h5 className="font-semibold text-sm mb-2">Other Options:</h5>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• <a href="https://hootsuite.com" target="_blank" rel="noopener noreferrer" className="underline">Hootsuite</a> - More analytics</li>
                        <li>• <a href="https://later.com" target="_blank" rel="noopener noreferrer" className="underline">Later</a> - Visual calendar</li>
                        <li>• <a href="https://www.socialpilot.co" target="_blank" rel="noopener noreferrer" className="underline">SocialPilot</a> - Affordable bulk scheduling</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 dark:bg-blue-950 rounded-lg p-4">
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-2">Pro Tips for Maximum Reach</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-emerald-700 dark:text-emerald-300">Best Times to Post</p>
                      <p className="text-muted-foreground">Mon-Fri: 11am-1pm, 7-9pm CST</p>
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-700 dark:text-emerald-300">Posting Frequency</p>
                      <p className="text-muted-foreground">4-5 posts/week minimum</p>
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-700 dark:text-emerald-300">Content Mix</p>
                      <p className="text-muted-foreground">70% value, 20% engagement, 10% promo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
}
