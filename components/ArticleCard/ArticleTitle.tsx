function ArticleTitle({ title }: { title: string }) {
  return (
    <p className="line-clamp-2 h-pr-56 w-pr-250 text-18m leading-7 text-t-secondary">
      {title}
    </p>
  );
}

export default ArticleTitle;
