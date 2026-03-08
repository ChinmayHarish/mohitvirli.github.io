interface ProjectUrl {
  text: string;
  url: string;
}

export interface Project {
  title: string;
  date: string;
  subtext: string;
  url?: string;
  repoUrl?: string;
  urls?: ProjectUrl[];
  techStack?: string[];
  impact?: string;
}