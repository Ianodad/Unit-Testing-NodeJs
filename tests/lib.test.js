const lib = require('../lib');
const ex = require('../exercise1')
const db = require('../db')
const mail = require('../mail');

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);

        expect(result).toBe(1);
    });

    it('should return a positive number if input is nagative', () => {
        const result = lib.absolute(-1);

        expect(result).toBe(1);
    });
    it('should return 0 number if input is 0', () => {
        const result = lib.absolute(0);

        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Mosh');
        expect(result).toMatch(/Mosh/);
        expect(result).toContain('Mosh')

    })
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        // Too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // Too specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        //Proper way
        expect(result[0]).toContain('USD');
        expect(result[1]).toContain('AUD');
        expect(result[2]).toContain('EUR');

        //Ideal way
        expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']))

    });
});

describe('getProduct', () => {
    it('should return the product with a given id', () => {
        const result = lib.getProduct(1);
        // expect(result).toEqual({
        //     id: 1,
        //     price: 10
        // });
        expect(result).toMatchObject({
            id: 1,
            price: 10
        });
        // expect(result).toHaveProperty({
        //     id: '1'
        // });
    });
});

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        // what is falsy? Null, undefined, NAN ,'', 0, false,

        const args = [null, undefined, NaN, '', 0, false]

        args.forEach(a => {
            expect(() => {
                lib.registerUser(a)
            }).toThrow();
        });
    });

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('mosh');
        expect(result).toMatchObject({
            username: 'mosh'
        });
        expect(result.id).toBeGreaterThan(0);
    })
})

describe('applyDiscount' ,() => {
    it('should apply 10% discount if customer has more than 10 points', () =>{
        db.getCustomerSync = function(customerId) {
            console.log('Fake reading customer...');
            return { id: customerId, points: 20 }
        }
        const order = {customerId:1, totalPrice: 10 }
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);

    })

});

describe('notifyCustomer', ()=> {
    it('should send an email to the customer', () => {


        // const mockFunction = jest.fn();
        // // mockFunction.mockReturnValue(1);
        // // mockFunction.mockResolveValue(1);
        // mockFunction.mockRejectedValue(new Error('...');


        // const result = mockFunction();

        db.getCustomerSync = function(customerId) {
            return {email: 'a'}
        }
        // let mailSent = false;
        // mail.send = function(email, message) {
        //     mailSent = true;
        mail.send=jest.fn()

        lib.notifyCustomer({customerId: 1});

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);

    })
})
// Fizz buzzy excersice
describe('fizzBuzz', () => {
    it('should throw an exception if input', ()=>{
        expect(() =>{ex.fizzBuzz('a')}).toThrow();
        expect(() =>{ex.fizzBuzz(null)}).toThrow();
        expect(() =>{ex.fizzBuzz(undefined)}).toThrow();

    })
    it('should return FizzBuzz if input is divisible by 3', () => {
        const result = ex.fizzBuzz(6)
        expect(result).toEqual('Fizz')
    });

    it('should return FizzBuzz if input is divisible by 5', () => {
        const result = ex.fizzBuzz(10)
        expect(result).toBe('Buzz')
    });

    it('should return FizzBuzz if input is divisible by 3 and 5',() => {
        const result = ex.fizzBuzz(15)
        expect(result).toBe('FizzBuzz')
    });

     it('should return input if not divisible by 3 or 5', () => {
         const result = ex.fizzBuzz(1)
         expect(result).toBe(1)
     });
})