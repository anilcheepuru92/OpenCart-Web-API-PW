
export class StringUtils {
    static getRandomEmail(): string{
        const random = Math.random().toString(36).substring(2, 8);
        return `user_${random}@cart.com`;
    }
}