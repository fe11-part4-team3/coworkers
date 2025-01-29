import { IMember } from '@/types/group.type';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import Profile from '@/components/Profile/Profile';
import KebabDropDown from '@/components/KebabDropDown';

interface GroupMemberCard {
  member: IMember;
}

export default function GroupMemberCard({ member }: GroupMemberCard) {
  const deviceType = useDeviceType();

  return (
    <div className="relative flex max-h-pr-73 items-center gap-pr-12 rounded-pr-16 bg-b-secondary px-pr-24 py-pr-20 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg mo:px-pr-16 mo:py-pr-12">
      {deviceType !== 'mobile' ? (
        <DefaultContent member={member} />
      ) : (
        <MobileContent member={member} />
      )}
      {/* TODO 수정, 삭제 기능 구현 */}
      <KebabDropDown onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}

// NOTE GroupMemberCard와 타입이 동일하지만 의미론적으로 분리했습니다.
interface ContentProps {
  member: IMember;
}

const NAME_CLASSNAME = 'truncate text-14m text-t-primary';
const EMAIL_CLASSNME = 'truncate text-12 text-t-secondary';
//NOTE className에 직접 넣으니 h랑 w가 size로 병합되어 따로 상수로 만들었습니다.

function DefaultContent({ member }: ContentProps) {
  return (
    <>
      <Profile variant="member" image={member.userImage} profileSize={32} />
      <div className="grow overflow-hidden text-t-primary">
        <p className={NAME_CLASSNAME}>{member.userName}</p>
        <p className={EMAIL_CLASSNME}>{member.userEmail}</p>
      </div>
    </>
  );
}

function MobileContent({ member }: ContentProps) {
  return (
    <div className="flex grow flex-col overflow-hidden">
      <div className="flex items-center gap-pr-8">
        <Profile variant="member" image={member.userImage} profileSize={24} />
        <p className={NAME_CLASSNAME}>{member.userName}</p>
      </div>
      <p className={EMAIL_CLASSNME}>{member.userEmail}</p>
    </div>
  );
}
