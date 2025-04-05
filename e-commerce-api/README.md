
### Prerequisites
- Java 21+ (JDK)
- Gradle 8.0
- MySQL 8.0

### Steps
create a database
connect to phpmyadmin and create a database
```sql
CREATE DATABASE IF NOT EXISTS `e_commerce` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

### Run the application

Change permission
```bash
chmod +x ./gradlew
```
Run the application
```bash
./gradlew bootRun
```
