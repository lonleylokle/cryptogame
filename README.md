#### Demonstration

https://www.youtube.com/watch?v=omzJB6aT5tQ

#### Build

1. Install truffle, Angular CLI and an Ethereum client. If you don't have a test environment
   
   ```
   npm install -g truffle
   npm install -g @angular/cli
   npm install -g ganache-cli
   ```

2. Download the project.
   
   ```
   git clone https://github.com/lonleylokle/cryptogame
   ```

3. Run your Ethereum client. For Ganache CLI:
   
   ```
   ganache-cli
   ```
   
   Note the mnemonic 12-word phrase printed on startup, you will need it later.

4. Install the dependencies and Compile and migrate your contracts, into the directory Blockchain using :
   
   ```
   npm install 
   ```

5. Change the port in truffle-config.js `change the port in truffle-config.js 8545 in windows the port is 7545 but in linux the defaul port is 8545

6. Navigate into the Frontend Directory
   
   ```
   npm install & ng serve
   ```
