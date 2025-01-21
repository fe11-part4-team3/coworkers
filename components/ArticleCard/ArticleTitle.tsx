function ArticleTitle({ title }: { title: string }) {
  return (
    <p className="line-clamp-2 max-h-pr-56 text-18m leading-7 text-t-secondary mo:mb-pr-12 mo:max-h-pr-48 mo:text-14 mo:leading-6">
      {title}
    </p>
  );
}

export default ArticleTitle;
