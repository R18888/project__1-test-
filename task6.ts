class Transport 
{
    protected color: string;
    protected year: number; 
    protected mileage: number; 

    constructor(color: string, year: number, mileage: number) 
    {
        this.color = color;
        this.year = year;
        this.mileage = mileage;
    }

    protected logFields() 
    {
        console.log(`Цвет: ${this.color}, Год выпуска: ${this.year}, Пробег: ${this.mileage}`);
    }

    public setColor(color: string) 
    {
        this.color = color;
        this.logFields();
    }

    public setYear(year: number) 
    {
        this.year = year;
        this.logFields();
    }

    public setMileage(mileage: number) 
    {
        this.mileage = mileage;
        this.logFields();
    }
}

class Car extends Transport 
{
    private brand: string; 
    private model: string;

    constructor(color: string, year: number, mileage: number, brand: string, model: string) 
    {
        super(color, year, mileage);
        this.brand = brand;
        this.model = model;
    }

    public logFields() 
    {
        super.logFields();
        console.log(`Марка: ${this.brand}, Модель: ${this.model}`);
    }

    public setBrand(brand: string) 
    {
        this.brand = brand;
        this.logFields();
    }

    public setModel(model: string) 
    {
        this.model = model;
        this.logFields();
    }
}

console.log('\n');
const car1 = new Car('Черный', 2005, 155000, "Huyndai", "Elantra");
car1.logFields();

console.log('\nИзменили год выпуска на 2004');
car1.setYear(2004);

console.log('\nИзменили модель авто на Солярис');
car1.setModel("Solaris");
