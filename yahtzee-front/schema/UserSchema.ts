import { z } from 'zod';

const UserSignup = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

const Login = UserSignup.pick({username: true, password: true})

const User = z.object({
  user_id: z.string(),
  username: z.string(),
})

export { UserSignup, Login, User };
