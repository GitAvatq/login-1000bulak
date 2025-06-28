import hero from "../../../assets/images/admin-hero.png";
import logo from "../../../assets/images/logo.svg";
import wayIn from "../../../assets/images/way-in.svg";
import "./Login.scss";
import "../../../assets/styles/media.scss";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

// Аутентификация = «Кто ты?»

// Авторизация = «Что тебе можно?»

const Login = () => {
  const { saveLogin } = useContext(AuthContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  function handleChangeLogin(e) {
    setLogin(e.target.value);
    setLoginError("");
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
    setPasswordError("");
  }

  const fakeApi = async (login, password) => {
    const admin = {
      id: 1,
      login: "admin-1",
      role: "admin",
      password: "12345678",
    };

    setLoginError("");
    setPasswordError("");
    let loginsErr = "";
    let passwordsErr = "";

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (admin.login !== login) {
          loginsErr = "Неверно указано имя";
        }
        if (admin.password !== password) {
          passwordsErr = "Неверный пароль";
        }

        if (loginsErr || passwordsErr) {
          reject({ loginsErr, passwordsErr });
        } else {
          saveLogin(admin);
          navigate("/profile");
          resolve({ role: "admin" });
        }
      }, 1000);
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fakeApi(login, password);
    } catch (error) {
      if (error.loginsErr) {
        setLoginError(error.loginsErr);
      }
      if (error.passwordsErr) {
        setPasswordError(error.passwordsErr);
      }
    }
  }

  return (
    <div id="login">
      <div className="login">
        <div className="login--left">
          <img className="login--left__logo" src={logo} alt="logo" />
          <img className="login--left__hero" src={hero} alt="hero" />
        </div>
        <div className="login--right">
          <div className="login--right__content">
            <img
              className="login--right__content__way-in"
              src={wayIn}
              alt="way in"
            />
            <div className="login--right__content__line"></div>
            <p className="login--right__content__subtitle">С возвращением!</p>
          </div>
          <form className="login--right__form" onSubmit={handleSubmit}>
            <div className="login--right__form__content">
              <div className="login--right__form__content__input">
                <label htmlFor="login">Введите имя</label>
                <input
                  style={{
                    border: `1px solid ${
                      loginError.length ? "#FF0000" : "black"
                    }`,
                    outlineColor: `${loginError ? "#FF0000" : "black"}`,
                  }}
                  className="login--right__form__content__input__area"
                  type="text"
                  id="login"
                  required
                  onChange={handleChangeLogin}
                />
                <p
                  style={{
                    color: "#FF0000",
                    fontSize: "12px",
                    height: "10px",
                    padding: "5px 0 0 0",
                  }}
                >
                  {loginError.length ? loginError : ""}
                </p>
              </div>
              <div className="login--right__form__content__input">
                <label htmlFor="password">Введите пароль</label>
                <input
                  style={{
                    border: `1px solid ${passwordError ? "#FF0000" : "black"}`,
                    outlineColor: `${passwordError ? "red" : "black"}`,
                  }}
                  className="login--right__form__content__input__area login--right__form__content__input__area--fake"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  onChange={handleChangePassword}
                  maxLength={8}
                />
                <p
                  style={{
                    color: "#FF0000",
                    fontSize: "12px",
                    padding: "5px 0 0 0",
                    height: "20px",
                  }}
                >
                  {passwordError ? passwordError : ""}
                </p>

                {/* <span className="login--right__form__content__input__area--large-dots">
                  {showPassword
                    ? password
                    : [...password].map((_, i) => (
                        <span key={i}>
                          <svg
                            width="9"
                            height="10"
                            viewBox="0 0 9 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="4.5" cy="5" r="4.5" fill="black" />
                          </svg>
                        </span>
                      ))}
                </span> */}
                <span
                  className="login--right__form__content__input__show-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
                <a
                  className="login--right__form__content__input__forgot-btn"
                  href="#"
                >
                  Забыли пароль?
                </a>
              </div>
            </div>
            <button
              type="submit"
              disabled={!login || !password || loginError || passwordError}
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
