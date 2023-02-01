function Register() {
    return (
        <div className="Register-container">
            <div class="account section">
                <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                    <div class="login-form border p-5">
                        <div class="text-center heading">
                        <h2 class="mb-2">Đăng ký</h2>
                        <p class="lead">Bạn đã có tài khoản? <a href="/login"> Đăng nhập ngay bây giờ</a></p>
                        </div>
            
                        <form action="#">
                        <div class="form-group mb-4">
                            <label for="#">Nhập địa chỉ email</label>
                            <input type="text" class="form-control" placeholder="Nhập địa chỉ email"/>
                        </div>
                        <div class="form-group mb-4">
                            <label for="#">Tên đăng nhập</label>
                            <a class="float-right" href="">Quên mật khẩu?</a>
                            <input type="text" class="form-control" placeholder="Nhập tên đăng nhập của bạn"/> 
                        </div>
                        <div class="form-group mb-4">
                            <label for="#">Mật khẩu</label>
                            <input type="text" class="form-control" placeholder="Nhập mật khẩu của bạn"/> 
                        </div>
                        <div class="form-group">
                            <label for="#">Nhập lại mật khẩu</label>
                            <input type="text" class="form-control" placeholder="Nhập lại mật khẩu" /> 
                        </div>
            
                        <a href="#" class="btn btn-main mt-3 btn-block">Đăng ký</a>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Register