/**
 * 이 codemod는 파일 내에서 `params`의 프로퍼티에 접근하는 코드를
 * `React.use(params)`로 감싸도록 변환합니다.
 *
 * 예)
 *   // 변경 전:
 *   const value = params.someProp;
 *
 *   // 변경 후:
 *   const value = React.use(params).someProp;
 */

module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // 대상: MemberExpression 중, 객체가 'params'인 경우
  root
    .find(j.MemberExpression, {
      object: { name: 'params' },
    })
    .forEach((path) => {
      const memberExp = path.node;

      // 이미 React.use(params)로 감싸진 경우는 건너뜁니다.
      // 예를 들어, React.use(params).someProp 인 경우는 제외
      if (
        j.CallExpression.check(path.parent.node) &&
        j.MemberExpression.check(path.parent.node.callee) &&
        path.parent.node.callee.object.name === 'React' &&
        path.parent.node.callee.property.name === 'use'
      ) {
        return;
      }

      // 현재 member expression을 React.use(params).(원래의 프로퍼티)로 교체합니다.
      const newExpression = j.memberExpression(
        j.callExpression(
          j.memberExpression(j.identifier('React'), j.identifier('use')),
          [j.identifier('params')],
        ),
        memberExp.property,
        memberExp.computed, // 대괄호 표기법 사용 여부 유지
      );

      j(path).replaceWith(newExpression);
    });

  return root.toSource();
};
