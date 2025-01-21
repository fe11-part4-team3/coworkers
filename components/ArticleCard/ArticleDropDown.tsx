import ArticleImg from './ArticleImg';
import DropDown from '../DropDown';

function ArticleDropDown({ image }: { image: string | null }) {
  return (
    <div className="ml-auto flex">
      {image !== null && <ArticleImg src="/images/codeitprofile.png" />}

      <div className="mo:absolute mo:bottom-pr-29 mo:right-pr-16 mo:ml-0">
        <DropDown
          trigger={<button className="icon-kebab ml-pr-16" />}
          items={[
            { text: '수정하기', onClick: () => alert('수정하기') },
            { text: '삭제하기', onClick: () => alert('삭제하기') },
          ]}
          width="w-pr-100"
        />
      </div>
    </div>
  );
}

export default ArticleDropDown;
