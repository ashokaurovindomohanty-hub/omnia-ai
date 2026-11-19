import Array "mo:base/Array";
actor {
  public type SubFeature = { name: Text; description: Text };
  public type Category = { id: Nat; title: Text; subs: [SubFeature] };
  
  stable var categories : [Category] = [
    { id=0; title="Data Science"; subs=[{name="Machine Learning"; description="ML models"}, {name="Deep Learning"; description="Neural nets"}, {name="Data Visualization"; description="Charts & dashboards"}] },
    { id=1; title="Digital Marketing"; subs=[{name="SEO Optimization"; description="Rank higher"}, {name="Social Media Management"; description="Manage channels"}, {name="Content Creation"; description="AI content"}] },
    { id=2; title="Tech Innovation"; subs=[{name="IoT Solutions"; description="Connected devices"}, {name="Cloud Management"; description="Cloud ops"}, {name="Cybersecurity"; description="Secure systems"}] },
    { id=3; title="Analysis"; subs=[{name="Data Analyst"; description="Insights"}, {name="Business Intelligence"; description="BI dashboards"}] }
  ];
  public query func getCategories() : async [Category] { categories };
  public query func getAdvancedFeatures() : async [Text] { ["Natural Language Processing (NLP)", "Computer Vision", "Predictive Analytics", "Automation"] };
}
