import React, { useRef } from "react";
import MainLayout from "../../layouts/main-layout/MainLayout";
import emailjs from "@emailjs/browser";
import "./contact.scss";
export default function Contact() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_1obz9h9",
        "template_xz8o0d9",
        form.current,
        "X8w8CO4WHLVxBtx_S"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <MainLayout>
      <section>
        <div className="container-contact">
          <h2>Contact Us</h2>
          <p className="text-ques">
            Feel free to contact us if you need any assistance, any help or
            another question.
          </p>
          <div className="box">
            <form ref={form} onSubmit={sendEmail}>
              <input
                type="text"
                name="user_name"
                placeholder="Tên đầy đủ"
                required
              />
              <input
                type="email"
                name="user_email"
                placeholder="Email hoạt động của bạn"
                required
              />
              <input type="text" name="subject" placeholder="Chủ đề" required />
		    <input type="text" name="phone" placeholder="Phone Number" required />
              <textarea
                placeholder="Message"
                name="message"
                cols="30"
                rows="10"
              ></textarea>
              <button
                style={{ background: "orangered" }}
                className="--btn --btn-primary"
              >
                Gửi
              </button>
            </form>

            {/* <div className={styles.details}>
              <Card cardClass={styles.card2}>
                <h3>Thông tin liên hệ của chúng tôi!</h3>
                <p>Nhập thông tin hoặc liên hệ chúng tôi qua thông tin sau:</p>
                <div className={styles.icons}>
                  <span>
                    <FaPhoneAlt />
                    <p>+84 1234 5678</p>
                  </span>
                  <span>
                    <FaEnvelope />
                    <p>eshop@gmail.com</p>
                  </span>
                  <span>
                    <GoLocation />
                    <p>Sơn Trà, Đà Nẵng</p>
                  </span>
                  <span>
                    <FaFacebook />
                    <p>@TranTai</p>
                  </span>
                </div>
              </Card>
            </div>
          </div> */}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
