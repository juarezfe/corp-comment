// {"id":10,"company":"Adidas","badgeLetter":"A","upvoteCount":9,"daysAgo":3,"text":"i like your website #adidas, but your sizing guide needs some work. it suggested an L for me but when it arrived it was too big. still kept it btw"}]}
export type FeedbackItem = {
  id: number;
  company: string;
  badgeLetter?: string;
  upvoteCount: number;
  daysAgo: number;
  text: string;
};
