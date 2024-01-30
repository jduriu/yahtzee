import LoginForm from "../_components/LoginForm"

export default function Login() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-[90%] w-1/3 rounded-3xl shadow-2xl p-5">
        <LoginForm/>
      </div>
    </div>
  )
}
