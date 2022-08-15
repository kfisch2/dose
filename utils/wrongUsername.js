const wrongUsername = () => {
  const alertPlaceholder = document.querySelector('.login-alert');
  const alert = (message, type) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '   <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>',
      ].join('');
      alertPlaceholder.append(wrapper);
  };
      alert(`username not found`, 'danger')
};

module.exports = wrongUsername;