
import { FC } from "react";
import { Building, Award } from "lucide-react";

interface MissionValuesSectionProps {
  values: {
    title: string;
    description: string;
  }[];
}

const MissionValuesSection: FC<MissionValuesSectionProps> = ({ values }) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're guided by a clear mission and core values that shape everything we do.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <Building className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To empower dental professionals with cost-effective access to quality supplies and equipment, allowing them to provide better care at lower costs.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <Award className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              A world where every dental practice can thrive by accessing fair pricing on the supplies and equipment they need, without compromising on quality.
            </p>
          </div>
        </div>
        
        <div className="bg-secondary/30 p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-6 text-center">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionValuesSection;
