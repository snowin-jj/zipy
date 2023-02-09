import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useError } from '@/context/error';
import { MdOutlineClose, MdOutlineModeEditOutline } from 'react-icons/md';
import { updateLink, deleteLink } from '@/lib/mutations';
import { useLink } from '@/lib/hooks';
import Button from '@/components/general/Button';
import InputGroup from '@/components/general/InputGroup';
import PageLoader from '@/components/general/PageLoader';
import Spinner from '@/components/general/Spinner';
import { HiOutlineClipboardDocument } from 'react-icons/hi2';
import EmptyState from '@/components/EmptyState';

const LinkPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const { changeErrorState } = useError();
	const inputRef = useRef<HTMLInputElement>();
	const { data, isLoading } = useLink(id as string);
	const { data: session } = useSession();
	const [loading, setLoading] = useState<boolean>(false);
	const [editable, setEditable] = useState<boolean>(false);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [editable]);

	useEffect(() => {
		inputRef.current && (inputRef.current.value = data?.url);
	}, [data]);

	if (isLoading) return <PageLoader />;
	if (!session) router.push('/login');
	if (!data) return <EmptyState msg='No Link Found!' />;

	const generatedUrl = `${window.location.origin}/api/${data?.User.username}/${data?.slug}`;

	const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setEditable(false);
		if (inputRef.current.value !== '' && editable) {
			try {
				await updateLink({
					id,
					url: inputRef.current.value,
				});
			} catch (e) {
				console.log(e.message);
				changeErrorState({ isError: true, msg: e.message });
			}
		}
		setLoading(false);
	};

	const handleDelete = async () => {
		try {
			await deleteLink(id as string);
			await router.push('/dashboard');
		} catch (e) {
			console.log(e.message);
			changeErrorState({ isError: true, msg: e.message });
		}
	};

	const handleCopy = () => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(generatedUrl);
		}
	};

	return (
		<section className='center min-h-screen -mt-28'>
			<form
				className='w-full max-w-[28rem] flex flex-col  items-center gap-8'
				onSubmit={handleUpdate}
			>
				<h1 className='title text-4xl self-start'>{data?.name}</h1>
				<h4 className='font-semibold text-xl self-start flex items-center gap-2'>
					Slug:
					<span className='bg-primary-400 text-white text-base px-3 p-1 rounded-full'>
						{data?.slug}
					</span>
				</h4>
				<div className='w-full flex items-end gap-4'>
					<InputGroup
						value={generatedUrl}
						type='url'
						name='Generated URL'
						required={true}
						disabled={true}
					/>
					<Button tw='w-fit icon-btn' handleClick={handleCopy}>
						<HiOutlineClipboardDocument size={22} />
					</Button>
				</div>
				<div className='w-full flex items-end gap-4'>
					<InputGroup
						ref={inputRef}
						type='url'
						name='Destination URL'
						required={true}
						disabled={!editable}
						autoFocus={true}
					/>
					{editable ? (
						<Button
							tw='w-fit icon-btn'
							handleClick={() => {
								setEditable(false);
								inputRef.current.value = data?.url;
							}}
						>
							<MdOutlineClose size={24} />
						</Button>
					) : (
						<Button tw='w-fit icon-btn' handleClick={() => setEditable(true)}>
							<MdOutlineModeEditOutline size={24} />
						</Button>
					)}
				</div>
				<div className='w-full flex flex-col md:flex-row items-center gap-4'>
					<Button
						type='button'
						tw='center bg-red-400 outline-red-400 outline-offset-2'
						handleClick={handleDelete}
					>
						Delete
					</Button>
					<Button type='submit' tw='center'>
						{loading ? <Spinner /> : 'Update'}
					</Button>
				</div>
			</form>
		</section>
	);
};

export default LinkPage;
