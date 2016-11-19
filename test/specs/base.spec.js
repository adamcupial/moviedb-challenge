/* global describe it */
import assert from 'assert';
import Base from 'components/Base';

describe('Base Component',
  () => {
    it('Should behave as abstract class',
      () => {
        assert.throws(
          () => {
            const base = new Base(); // eslint-disable-line no-unused-vars
          },
          /TypeError/
        );
      }
    );

    it('Should require children to implement render',
      () => {
        class A extends Base {
        }

        assert.throws(
          () => {
            const z = new A(); // eslint-disable-line no-unused-vars
          },
          /implement/
        );
      }
    );

    it('Should allow emitting and listening',
      (done) => {

        class A extends Base {
          render() {}
        }

        const a = new A();
        a.on('testEvent', (args) => {
          assert(true);
          assert.equal(args.type, 'HELLO');
          done();
        });

        a.emit('testEvent', { type: 'HELLO' });
        assert(false);
        done();
      }
    );

    it('Should have a working _render helper',
      () => {
        class A extends Base {
          render() {}
        }

        const a = new A();
        const cont = document.createElement('div');
        const tmpl = cont => `<div class="test">${cont.name}</div>`;

        const ret = a._render(cont, tmpl, { name: 'HELLO' });

        assert.ok(cont.querySelector('.test'));
        assert.ok(ret.querySelector('.test'));
        assert.equal(cont.querySelector('.test').childNodes[0].textContent, 'HELLO');
        assert.equal(ret.querySelector('.test').childNodes[0].textContent, 'HELLO');
      }
    );
  }
);
