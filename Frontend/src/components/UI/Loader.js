import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <section className="flex items-center justify-center">
      <div className={classes.loader}></div>
    </section>
  );
};

export default Loader;
