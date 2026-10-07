const Avatar = ({ user, className = "size-9", text = "text-xs" }) => (
  <span className={`${className} grid shrink-0 place-items-center overflow-hidden rounded-full bg-accent font-medium uppercase text-accent-foreground`}>
    {user?.profile_picture ? (
      <img src={user.profile_picture} alt={user.username} className="size-full object-cover" />
    ) : (
      <span className={text}>{user?.first_name?.[0]}{user?.last_name?.[0]}</span>
    )}
  </span>
);

export default Avatar;
