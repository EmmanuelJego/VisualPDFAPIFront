interface FeatureLink {
  target: string;
  text: string;
  icon?: string;
}

interface Feature {
  name: string;
  description: string;
  icon?: string;
  imageSrc?: string;
  link1?: FeatureLink;
  link2?: FeatureLink;
}

export { Feature, FeatureLink };
export default Feature;
