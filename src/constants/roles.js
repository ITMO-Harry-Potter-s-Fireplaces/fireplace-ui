export const rusRole = role => {
    var role_dict = {
        'ADMIN': 'АДМИНИСТРАТОР',
        'MODERATOR': 'ДИСПЕТЧЕР',
        'USER': 'ПОЛЬЗОВАТЕЛЬ',
        'MINISTER': 'МИНИСТР МАГИИ'
    };
    return role_dict[role];
};
 
