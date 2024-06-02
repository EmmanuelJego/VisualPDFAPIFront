interface FeatureLink {
  target: string;
  hash?: string;
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
  category?: string;
  id?: string;
}

export { Feature, FeatureLink };
export default Feature;
