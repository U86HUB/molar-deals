
import { FC } from "react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

const TeamSection: FC<TeamSectionProps> = ({ teamMembers }) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The passionate professionals behind DentalDeals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-40 h-40 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-semibold text-gray-500">{member.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
