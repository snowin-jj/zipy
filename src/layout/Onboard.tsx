import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMe } from '@/lib/hooks';
import { useError } from '@/context/error';
import InputGroup from '@/components/general/InputGroup';
import Button from '@/components/general/Button';
import Spinner from '@/components/general/Spinner';

const Onboard = () => {
	const [username, setUsername] = useState<string | undefined>();
	const [loading, setLoading] = useState<boolean>(false);
	const { changeErrorState } = useError();
	const { mutateUser } = useMe();
	const { data: session } = useSession();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			await mutateUser({ username });
		} catch (e) {
			changeErrorState({ isError: true, msg: e.message });
		}

		setLoading(false);
		setUsername('');
	};

	return (
		<section className='center min-h-screen -mt-28'>
			<form
				className='w-full max-w-[28rem] flex flex-col  items-center gap-8'
				onSubmit={handleUpdate}
			>
				<h1 className='title'>Choose your Username</h1>
				<InputGroup
					value={String(session?.user?.email)}
					type='email'
					name='Logged in as'
					placeholder='eg: johndoe@gmail.com'
					disabled={true}
				/>
				<InputGroup
					value={username}
					type='name'
					name='name'
					placeholder='eg: johndoe'
					minLength={3}
					required={true}
					onChange={handleChange}
				/>
				<Button type='submit' tw='center'>
					{loading ? <Spinner /> : 'Save'}
				</Button>
			</form>
		</section>
	);
};

export default Onboard;
