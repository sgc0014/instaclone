export default function Loading() {
  return (
    <div className="loadingBody">
      <img src={"/static/loading.png"} />
      <style jsx>{`
        .loadingBody {
          background: #fefeff;
          width: 100vw;
          height: 100vh;
        }
        .loadingBody > img {
          width: 140px;
          position: absolute;
          left: calc(50% - 70px);
          top: 50%;
        }
      `}</style>
    </div>
  );
}
