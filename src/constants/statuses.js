export const rusStatus = status => {
    var status_dict = {
        'CREATED': 'СОЗДАНА',
        'APPROVED': 'ПОДТВЕРЖДЕНА',
        'REJECTED': 'ОТКЛОНЕНА',
        'COMPLETED': 'ЗАВЕРШЕНА',
        'CANCELLED': 'ОТМЕНЕНА'
    };
    return status_dict[status];
};
 

