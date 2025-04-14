
interface DealStatsProps {
  views: number;
  clicks: number;
}

export const DealStats = ({ views, clicks }: DealStatsProps) => {
  return (
    <div className="flex gap-4 md:gap-8 text-center">
      <div>
        <p className="text-2xl font-bold">{views}</p>
        <p className="text-xs text-muted-foreground">Views</p>
      </div>
      <div>
        <p className="text-2xl font-bold">{clicks}</p>
        <p className="text-xs text-muted-foreground">Clicks</p>
      </div>
      <div>
        <p className="text-2xl font-bold">
          {clicks > 0 
            ? `${Math.round((clicks / views) * 100)}%` 
            : '0%'}
        </p>
        <p className="text-xs text-muted-foreground">CTR</p>
      </div>
    </div>
  );
};
