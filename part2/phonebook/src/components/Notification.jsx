const Notification = ({ info }) => {
  const { message, className } = info
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification