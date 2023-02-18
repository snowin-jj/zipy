import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { MdOutlineClose, MdOutlineModeEditOutline } from 'react-icons/md';
import { HiOutlineClipboardDocument } from 'react-icons/hi2';
import { useError } from '@/context/error';
import { updateLink, deleteLink } from '@/lib/mutations';
import { useLink } from '@/lib/hooks';
import Button from '@/components/general/Button';
import InputGroup from '@/components/general/InputGroup';
import PageLoader from '@/components/general/PageLoader';
import Spinner from '@/components/general/Spinner';
import EmptyState from '@/components/EmptyState';
import ConfirmModel from '@/components/general/ConfirmModal';

const LinkPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const { changeErrorState } = useError();
	const inputRef = useRef<HTMLInputElement>();
	const { link, isLoading } = useLink(id as string);
	const [loading, setLoading] = useState<boolean>(false);
	const [editable, setEditable] = useState<boolean>(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [editable]);

	useEffect(() => {
		inputRef.current && (inputRef.current.value = link?.url);
	}, [link]);

	if (isLoading) return <PageLoader />;
	if (!link) return <EmptyState msg='No Link Found!' />;

	const generatedUrl = `${window.location.origin}/${link?.User.username}/${link?.slug}`;

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
				<h1 className='title text-4xl self-start'>{link?.name}</h1>
				<h4 className='font-semibold text-xl self-start flex items-center gap-2'>
					Slug:
					<span className='bg-primary-400 text-white text-base px-3 p-1 rounded-full'>
						{link?.slug}
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
								inputRef.current.value = link?.url;
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
						handleClick={() => setOpen(true)}
					>
						Delete
					</Button>
					<Button type='submit' tw='center'>
						{loading ? <Spinner /> : 'Update'}
					</Button>
				</div>
			</form>
			<ConfirmModel
				onAction={handleDelete}
				open={open}
				setOpen={setOpen}
				title='Delete Link'
				content={`Are you sure you want to delete ${link.title}? All
					of your link will be deactivated. This action
					cannot be undone.`}
				actionBtnText='Delete'
			/>
		</section>
	);
};

export default LinkPage;
