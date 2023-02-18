import { useState } from 'react';
import { useRouter } from 'next/router';
import { useError } from '@/context/error';
import { createLink } from '@/lib/mutations';
import Button from '@/components/general/Button';
import Spinner from '@/components/general/Spinner';
import InputGroup from '@/components/general/InputGroup';

const CraeteLink = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const { changeErrorState } = useError();

	const handleCreateLink = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		const form = new FormData(e.target as HTMLFormElement);
		const formData = Object.fromEntries(form.entries());

		try {
			await createLink(formData);
			await router.push('/dashboard');
		} catch (e) {
			console.log(e.message);
			changeErrorState({ isError: true, msg: e.message });
		}

		setLoading(false);
	};

	return (
		<section className='center min-h-screen -mt-28'>
			<form
				className='w-full max-w-[28rem] flex flex-col  items-center gap-8'
				onSubmit={handleCreateLink}
			>
				<h1 className='title'>Create New Link</h1>
				<InputGroup
					type='text'
					name='title'
					placeholder='eg: Instagram'
					minLength={3}
					required={true}
				/>
				<InputGroup type='slug' name='slug' placeholder='eg: insta' />
				<InputGroup
					type='url'
					name='url'
					placeholder='eg: https://instagram.com/johndoe'
					required={true}
				/>
				<Button type='submit' tw='center'>
					{loading ? <Spinner /> : 'Create'}
				</Button>
			</form>
		</section>
	);
};

export default CraeteLink;
