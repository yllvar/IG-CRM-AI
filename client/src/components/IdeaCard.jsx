const IdeaCard = ({ content }) => {
  return (
    <div className="idea-card">
      <h3>Generated Content Idea 💡</h3>
      <pre>{content}</pre>
    </div>
  );
};

export default IdeaCard;
