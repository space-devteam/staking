import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Rocket, Users, CheckCircle } from "lucide-react";

const roadmapData = [
  {
    milestone: "Presale Launch",
    description: "Start of the presale phase. Early backers can get exclusive tokens at a discounted rate.",
    date: "Q1 2025",
    icon: <Calendar size={32} className="text-orange-700" />,
    image: "/images/presale.png",
  },
  {
    milestone: "Token Launch",
    description: "Official launch of MyToken. Tokens will be available for purchase on major exchanges.",
    date: "Q2 2025",
    icon: <Rocket size={32} className="text-orange-700" />,
    image: "/images/token-launch.png",
  },
  {
    milestone: "Partnerships",
    description: "Strategic partnerships with key platforms and integrations with Web3 services.",
    date: "Q3 2025",
    icon: <Users size={32} className="text-orange-700" />,
    image: "/images/partnerships.png",
  },
  {
    milestone: "Community",
    description: "Full launch of community-driven governance, where holders can vote on proposals.",
    date: "Q4 2025",
    icon: <CheckCircle size={32} className="text-orange-700" />,
    image: "/images/governance.png",
  },
];

export const RoadmapSection = () => {
  return (
    <div className="bg-purple-100 relative bg-no-repeat bg-cover z-0 bg-center" style={{ backgroundImage: 'url(/images/bg.jpg)' }}>
        {/* <div className="absolute inset-0 bg-purple-100 opacity-60 z-0"></div> */}
    <section id="roadmap" className="container py-24 sm:py-32 mx-auto px-4 md:px-8 z-10">
      <div className="text-center mb-16 z-30">
        <h2 className="text-lg text-black mb-2 font-semibold">Roadmap</h2>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-900">Our Journey Ahead</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Follow our journey as we revolutionize the crypto space. Our roadmap outlines key milestones and plans for the future.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-px bg-gray-300 h-full"></div>

        {roadmapData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between mb-16 relative z-10 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
              <Card className="bg-purple-200 shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardHeader className="flex items-center space-x-4">
                 
                    {item.icon}
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent">{item.milestone}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm hidden md:inline text-gray-600 mb-4 text-center">{item.description}</p>
                  <p className="text-sm text-gray-500 font-semibold">{item.date}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </section>

    </div>
  );
};

export default RoadmapSection;
