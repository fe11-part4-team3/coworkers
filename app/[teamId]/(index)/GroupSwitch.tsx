import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import IconChart from '@/public/images/icon-chart-pie.svg';
import IconText from '@/public/images/icon-text-box-outline.svg';

interface ReportSwitchProps {
  checked: boolean;
  onCheckedChange: () => void;
}

export default function ReportSwitch({
  checked,
  onCheckedChange,
}: ReportSwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <Label
        htmlFor="show-chart"
        className={`transition-all duration-300 ${checked ? 'scale-90 text-[--input]' : 'text-t-primary'}`}
      >
        <IconText />
      </Label>
      <Switch
        id="show-chart"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label
        htmlFor="show-chart"
        className={`transition-all duration-300 ${checked ? 'text-t-primary' : 'scale-90 text-[--input]'}`}
      >
        <IconChart />
      </Label>
    </div>
  );
}
