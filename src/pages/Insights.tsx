const Insights = () => (
    <div style={{ padding: "2rem" }}>
      <h1>Data Insights</h1>
      <iframe
        src="https://quicksight.aws.amazon.com/embed-url-example"
        title="QuickSight Dashboard"
        style={{
          width: "100%",
          height: "80vh",
          border: "none",
        }}
      ></iframe>
    </div>
  );
  
  export default Insights;
  