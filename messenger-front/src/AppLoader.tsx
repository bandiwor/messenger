import cls from "./AppLoader.module.scss";

export default function AppLoader() {
  return (
    <div className={cls.page}>
      <h1 className={cls.title}>
        Пожалуйста, подождите, приложение загружается.
      </h1>
      <div className={cls.loader}>
        <div className={cls.spinner}>
          <div className={`${cls.spinner} ${cls.transparent}`}>
            <div className={cls.spinner}>
              <div className={`${cls.spinner} ${cls.transparent}`}>
                <div className={cls.spinner}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
