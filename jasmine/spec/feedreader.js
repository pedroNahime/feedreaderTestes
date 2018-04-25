/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    //Primeiro grupo de testes
    describe('RSS Feeds', function() {

        //Teste garantindo que a allFeeds foi definida
        it('Esta definido', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        //Verifica se todas as urls estão definidas ou não vazias
        it('Se a URL esta definida ou não esta vazia', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });
        //Verifica se todos os nomes estão definidos ou não vazios
        it('Se o nome esta definido ou não esta vazio', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    //Testa o menu
    describe('The menu', function() {
        //Verifica se o menu inicia escondido
        it('Menu esta escondido por padrao', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
            // ref: https://api.jquery.com/hasclass/
        });
        //Verifica se ao clicar o botão o menu fica visivel
        // e se ao clicar novamente esconde
        it('Muda visibilidade do menu quando quado clickado', function() {
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    // Testes das Entries
    describe('Initial Entries', function() {
        //Testa se apos carregar o "Feed" o valor das "entries"
        // inicias são maiores que 0
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('Estão presententes', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        var oldFeed;

        //Testar um novo feed carregado
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $('.feed').html();
                loadFeed(1, done);
            });
        });

        it('Diferente do feed velho', function() {
            expect($('.feed').html()).not.toBe(oldFeed);
        });
    });

}());
