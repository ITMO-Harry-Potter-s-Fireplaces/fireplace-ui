export const rusStatus = status => {
    var status_dict = {
        'CREATED': 'СОЗДАНА',
        'APPROVED': 'ОДОБРЕНА',
        'REJECTED': 'ОТКЛОНЕНА',
        'COMPLETED': 'ЗАВЕРШЕНА',
        'CANCELLED': 'ОТМЕНЕНА'
    };
    return status_dict[status];
};
 

