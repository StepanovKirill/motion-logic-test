[![Checking](https://github.com/StepanovKirill/motion-logic-test/actions/workflows/checking.yml/badge.svg)](https://github.com/StepanovKirill/motion-logic-test/actions/workflows/checking.yml) [![Deploy to gh-pages](https://github.com/StepanovKirill/motion-logic-test/actions/workflows/deploy-to-gh-pages.yml/badge.svg)](https://github.com/StepanovKirill/motion-logic-test/actions/workflows/deploy-to-gh-pages.yml)

### Тестовое задание в Motion Logic

- реализован кастомный селект с поиском;
- получение списка городов;
- поиск по колонкам, сортировка значений, выбор и удаление строк;
- навигация с помощью клавиатуры.

TODO:
- переиспользуемый инпут, селект (разделение ответственности между компонентами);
- разбить таблицу на более мелкие компоненты;
- покрыть тестами;
- вынос состояния наружу (общий список городов, результаты поиска, добавленные в таблицу);
- навигация стрелками;
- внешний вид таблицы.

PS: как я понял, была задача обойтись без UI-китов, иначе использовал бы готовые решения, например, react-select или UI-кит Mantine
