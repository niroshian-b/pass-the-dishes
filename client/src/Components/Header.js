import React, { useState } from 'react';
import styled from 'styled-components';
import { GiKnifeFork, GiExitDoor } from 'react-icons/gi';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const Header = () => {
	const history = useHistory();
	const { currentUser, handleSignOut } = useAuth();
	const [error, setError] = useState('');

	const handleLogOut = async () => {
		setError('');
		try {
			await handleSignOut();
			history.push('/');
		} catch {
			setError('Failed to log out');
		}
	};

	return (
		<Wrapper>
			<SiteName
				onClick={() => {
					if (currentUser) {
						history.push('/home');
					}
				}}
			>
				<GiKnifeFork />
				<Name>Pass the Dishes</Name>
			</SiteName>
			{currentUser && (
				<UserMenu>
					<EditUserLink onClick={() => history.push('/edit-user')}>
						<Username>Signed in as {currentUser.email}</Username>
					</EditUserLink>

					<LogOut variant="link" onClick={handleLogOut}>
						<GiExitDoor size={25} />
					</LogOut>
				</UserMenu>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	min-height: 75px;
	width: 100%;

	background-color: var(--primary-color);
	color: var(--secondary-color);

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Container = styled.div`
	font-size: 1.875rem;
	margin: 10px 30px;
`;

const SiteName = styled(Container)`
	font-family: var(--heading-font);
	&:hover {
		cursor: pointer;
	}
`;

const UserMenu = styled(Container)`
	font-size: 1rem;
	display: flex;
	align-items: center;
`;

const IconLink = styled.div`
	padding: 10px;
	&:hover {
		cursor: pointer;
	}
`;
const EditUserLink = styled(IconLink)``;

const Username = styled.div`
	padding: 10px;
`;

const LogOut = styled(IconLink)``;

const Name = styled.span`
	margin-left: 10px;
`;

export default Header;