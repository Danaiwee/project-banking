interface HeaderProps {
  type: string;
  title: string;
  user: string;
  description: string;
}

const Header = ({ type, title, user, description }: HeaderProps) => {
  return (
    <div className="header-box">
      <h1 className='header-box-title'>
        {title}
        {type === 'greeting' && (
            <span className='text-blue-500'>
                &nbsp;{user}
            </span>
        )}
      </h1>
      <p className='header-box-description'>{description}</p>
    </div>
  );
};

export default Header;
